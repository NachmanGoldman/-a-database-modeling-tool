using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project.Answers
{
    public class PostAnswer
    {
        public PostAnswer(bool successed, string massege, string command)
        {
            this.successed = successed;
            this.massege = massege;
            this.command = command;
        }
        public bool successed { get; set; }
        public string massege { get; set; }
        public string command { get; set; }
    }
}
