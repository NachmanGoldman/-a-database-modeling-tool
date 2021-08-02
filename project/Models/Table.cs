using System;
using System.Collections.Generic;
using System.Text;


namespace project.Models
{
    public class Table
    {
        private Table myObject;

        public Table()
        {
        }

        public Table(Table myObject)
        {
            this.myObject = myObject;
        }

        public Table(string tableName, List<Column> columns, List<Constraint> constraints, bool isConstraint)
        {
            TableName = tableName;
            Columns = columns;
            this.constraints = constraints;
            IsConstraint = isConstraint;
        }

        public string TableName { get; set; }
        public List<Column> Columns { get; set; }
        public List<Constraint> constraints{ get; set; }
        public bool IsConstraint { get; set; }
        public string CreateCommand()
        {
            StringBuilder Command = new StringBuilder();
            for (int i = 0; i < Columns.Count; i++)
            {
                Column c = Columns[i];
                string checkNull = "", checkPrimaryKey = "", checkDefaultValue = "";
                if (c.IsNull)
                    checkNull = " NOT NULL";
                if (c.IsPrimaryKey)
                    checkPrimaryKey = " PRIMARY KEY";
                if (c.isDefaultValue != null)
                    checkDefaultValue = " DEFAULT '" + c.isDefaultValue + "'";
                Command.Append(c.ColumnName + " " + c.Type + " (" + c.MaxLenght + ")" + checkDefaultValue + checkPrimaryKey + checkNull + ", ");
            }
            if (IsConstraint == true)
            {
                for (int i = 0; i < constraints.Count; i++)
                {
                    Constraint con = constraints[i];
                    Command.Append(@"FOREIGN KEY (");
                    foreach (string str in con.ColumnTarget)
                        Command.Append(str + ",");
                    Command.Length--;
                    Command.Append(") REFERENCES ");
                    Command.Append(con.TableSource + " (");
                    foreach (string str in con.ColumnSource)
                        Command.Append(str + ",");
                    Command.Length--;
                    Command.Append(@") ON DELETE CASCADE,");
                }
                Command.Length--;
            }
            else
                Command.Length--;

            return "DROP TABLE IF EXISTS " + TableName + ";" + "CREATE TABLE " + TableName + "(" + Command + ");";
        }

    }
}
