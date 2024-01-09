using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WEBAPI.Models;


namespace WEBAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : Controller
    {
        private static List<Item> items = new List<Item>
    {
        new Item { Id = 1, Name = "Books ", Price=1000},
        
        new Item { Id = 2, Name = "Mobile", Price=5000 },
        
        new Item { Id = 3, Name = "Charger", Price=5000},

        // Add more items as needed
    };

        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get()
        {
            return Ok(items);
        }

        [HttpGet("{id}")]
        public ActionResult<Item> GetById(int id)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpPost]
        public ActionResult<Item> Create(Item item)
        {
            // Generate a new ID (just an example, for a real scenario use proper ID generation)
            item.Id = items.Count + 1;
            items.Add(item);
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Item item)
        {
            var existingItem = items.FirstOrDefault(i => i.Id == id);
            if (existingItem == null)
                return NotFound();

            existingItem.Name = item.Name;
            existingItem.Price = item.Price;
            // Update other properties as needed

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var itemToRemove = items.FirstOrDefault(i => i.Id == id);
            if (itemToRemove == null)
                return NotFound();

            items.Remove(itemToRemove);
            return NoContent();
        }

    }
}
