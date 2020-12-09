﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Reactivities.Domain.Models
{
    [Table("Photos")]
    public class Photo
    {
        public string Id { get; set; }
        public bool IsMain { get; set; }
        public string Url { get; set; }
    }
}
