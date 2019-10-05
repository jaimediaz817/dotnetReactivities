using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
            public class Command : IRequest
            {
                public Guid Id { get; set; }        
            }
    
            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }            
    
                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {   
                    //  handke logic              
                    var Activity = await _context.Activities.FindAsync(request.Id);

                    if (Activity == null)
                    {
                        throw new Exception("No se pudo encontrar la actividad");
                    }

                    _context.Remove(Activity);

                    var success = await _context.SaveChangesAsync() > 0;
                    if (success)
                    {
                        return Unit.Value;
                    }
    
                    throw new Exception("Problema al guardar los cambios");
                }
            }        
    }
}