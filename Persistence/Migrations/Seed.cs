using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence.Migrations
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {   
            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Future Activitie 1",
                        Date = DateTime.Now.AddMonths(7),
                        Dscription = "actividad creada hace 1 mes",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    },

                    new Activity
                    {
                        Title = "Future Activitie 2",
                        Date = DateTime.Now.AddMonths(2),
                        Dscription = "actividad creada hace 1 mes",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    },

                    new Activity
                    {
                        Title = "Future Activities 3",
                        Date = System.DateTime.Now.AddMonths(3),
                        Dscription = "actividad creada hace 3 mes",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    }                                 
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();

            }
        }
    }
}