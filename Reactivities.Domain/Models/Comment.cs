using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reactivities.Domain.Models
{
    [Table("Comments")]
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}