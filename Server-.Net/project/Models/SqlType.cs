using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    public class SqlType
    {
        private string v1;
        private long v2;

        public SqlType(string v1, long v2)
        {
            this.type = v1;
            this.maxSize = v2;
        }

        public string type{ get; set; }
        public long maxSize { get; set; }
    }
}
