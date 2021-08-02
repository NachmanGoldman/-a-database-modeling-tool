using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{
    public class Constraint
    {
        public List<string> ColumnTarget { get; set; }
        public string TableSource { get; set; }
        public List<string> ColumnSource { get; set; }
    }   
}
