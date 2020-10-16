using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iChat.Hubs
{
    public class ChatHub : Hub
    {

        public async Task SendMessage(string username, string message, string date)
        {
            string t = DateTime.Now.ToString("HH:mm");
            date = t;
            await Clients.All.SendAsync("ReceiveMessage", username, message,date);
        }

    }
}
