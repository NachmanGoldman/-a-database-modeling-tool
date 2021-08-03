using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using project.Answers;
using System;

namespace project.Controllers
{
    public class CreateConnetionString
    {
        public SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();

        public PostAnswer setConnectionString(ConnectionSTR connection)
        {

            builder.DataSource = connection.DataSource;
            builder.UserID = connection.UserID;
            builder.Password = connection.Password;
            builder.InitialCatalog = connection.InitialCatalog;

            try
            {
                using (SqlConnection con = new SqlConnection(builder.ConnectionString))
                {
                    con.Open();
                    return new PostAnswer(true, "Connection string has been created!","");
                }
            }
            catch (Exception E)
            {
                return new PostAnswer(false, "Connection string is not valid!","");
            }
        }
        public String getConnectionString()
        {
            return builder.ConnectionString;
        }
    }
}
