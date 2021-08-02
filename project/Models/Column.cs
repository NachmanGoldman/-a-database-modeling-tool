using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    public class Column
    {
        public string ColumnName { get; set; }
        public String Type { get; set; }
        public int MaxLenght { get; set; }
        public bool IsPrimaryKey { get; set; }
        public string isDefaultValue { get; set; }
        public bool IsNull { get; set; }

    }
}
