using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User {
    public class Register {
        /**
        TODO: [ACRONIMO]
        chan
         */
        public class Command : IRequest<User> {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        // TODO: validador abstracto, 
        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator () {
                RuleFor (x => x.DisplayName).NotEmpty ();
                RuleFor (x => x.UserName).NotEmpty ();
                RuleFor (x => x.Email).NotEmpty ().EmailAddress();
                RuleFor (x => x.Password).Password();

            }
        }

        public class Handler : IRequestHandler<Command, User> {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler (DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator) {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<User> Handle (Command request, CancellationToken cancellationToken) {

                // TODO: validación
                if (await _context.Users.Where(x=> x.Email == request.Email).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "El email ya existe en la plataforma"});
                }

                if (await _context.Users.Where(x=> x.UserName == request.UserName).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "El Nombre de usuario ya existe en la plataforma"});
                }   

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.UserName
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        UserName = user.UserName,
                        Image = null
                    };
                }

                //  handke logic              
                // var success = await _context.SaveChangesAsync () > 0;
                // if (success) {
                //     return Unit.Value;
                // }

                throw new Exception ("Problema al intentar crear registro para nuevo Usuario");
            }
        }
    }
}