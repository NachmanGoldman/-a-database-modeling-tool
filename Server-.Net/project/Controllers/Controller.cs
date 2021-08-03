using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using project.Answers;
using project.Models;
using System;
using System.Collections.Generic;
using System.Data;
using Newtonsoft.Json;


namespace project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Controller : ControllerBase
    {
        public Controller(CreateConnetionString cs)
        {
            this.myConnetionString = cs;
        }
        public CreateConnetionString myConnetionString;
        [HttpGet]
        public List<string> GetAllTables()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(myConnetionString.getConnectionString()))
                {
                    String sql = @"select t.name as table_name
                                   from sys.tables t
                                   order by table_name;";
                    List<string> result = new List<string>();

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                result.Add(Convert.ToString(reader[0]));
                            }
                            return result;
                        }
                    }
                }
            }
            catch (SqlException e)
            {
                throw new Exception("SqlException");
            }
            catch (InvalidOperationException e)
            {
                throw new Exception("InvalidOperationException");
            }
        }
        [HttpGet("{name}")]
        public List<Column> GetTable(string name)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(myConnetionString.getConnectionString()))
                {
                    String sql = @"select 
                                   col.name,
                                   t.name as data_type,
                                   col.max_length,
                                   col.is_nullable
                                   from sys.tables as tab
                                   inner join sys.columns as col
                                   on tab.object_id = col.object_id
                                   left join sys.types as t
                                   on col.user_type_id = t.user_type_id
                                   where tab.name = '" + name + @"' -- enter table name here
                                   order by tab.name, column_id;";
                    string PK = findPK(name);
                    List<List<string>> result = new List<List<string>>();

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            Table table = new Table();
                            //List<string> line = new List<string>();
                            List<Column> columns = new List<Column>();
                            while (reader.Read())
                            {
                                Column column = new Column();
                                column.ColumnName = Convert.ToString(reader[0]);
                                column.Type = Convert.ToString(reader[1]);
                                column.MaxLenght = Convert.ToInt32(reader[2]);
                                column.IsNull = Convert.ToBoolean(reader[3]);
                                if (PK.Equals(column.ColumnName))
                                    column.IsPrimaryKey = true;
                                columns.Add(column);
                            }
                            return columns;
                        }
                    }
                }
            }
            catch (SqlException e)
            {
                throw new Exception("SqlException");
            }
            catch (InvalidOperationException e)
            {
                throw new Exception("InvalidOperationException");
            }
        }

        private string findPK(string name)
        {
            
            using (SqlConnection connection = new SqlConnection(myConnetionString.getConnectionString()))
            {
                string sql = @"SELECT K.COLUMN_NAME 
                        FROM    INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS C
                                JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K ON C.TABLE_NAME = '"+name+@"'
                                AND C.CONSTRAINT_CATALOG = K.CONSTRAINT_CATALOG
                                AND C.CONSTRAINT_SCHEMA = K.CONSTRAINT_SCHEMA
                                AND C.CONSTRAINT_NAME = K.CONSTRAINT_NAME
                        WHERE   C.CONSTRAINT_TYPE = 'PRIMARY KEY';";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    string result="";
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            result = Convert.ToString(reader[0]);
                        }
                        return result;
                    }
                }
            }
        }

        [HttpGet]
        [Route("getDbType")]
        public List<SqlType> getDbType()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(myConnetionString.getConnectionString()))
                {
                    String sql = @"SELECT 
                                    name,
                                    max_length
                                    FROM sys.types; ";
                    List<SqlType> result = new List<SqlType>();

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                result.Add(new SqlType(Convert.ToString(reader[0]), Convert.ToInt64(reader[1])));
                            }
                            return result;
                        }
                    }
                }
            }
            catch (SqlException e)
            {
                throw new Exception(e.Message);
            }
            catch (InvalidOperationException e)
            {
                throw new Exception(e.Message);
            }

        }
        [HttpPost]
        public PostAnswer PostConnectionString([FromBody] ConnectionSTR connection)
        {
            return myConnetionString.setConnectionString(connection);
        }

        [HttpPost]
        [Route("AddTable")]
        public PostAnswer PostTable([FromBody] Table table)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(myConnetionString.getConnectionString()))
                {
                    String sql = table.CreateCommand();

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
                            }
                        }
                    }
                }
            }
            catch (SqlException e)
            {
                return new PostAnswer(false, e.Message, "");
            }
            catch (InvalidOperationException e)
            {
                return new PostAnswer(false, "InvalidOperationException", "");
            }
            string com = table.CreateCommand();
            return new PostAnswer(true, "Table has been created!", com);
        }

        [HttpDelete("{tableName}")]
        public bool DeleteTable(string tableName)//[FromBody] JObject tableName)
        {
            string toDelete = tableName;//(string)JObject.Parse(tableName.ToString())["TableName"];
            try
            {
                using (SqlConnection connection = new SqlConnection(myConnetionString.getConnectionString()))
                {
                    string sql = @"drop table if exists " + toDelete + ";";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            return true;
                        }
                    }
                }
            }
            catch (SqlException e)
            {
                throw new Exception("sqlexception");
            }
            catch (InvalidOperationException e)
            {
                throw new Exception("invalidoperationexception");
            }
        }
    }
}
