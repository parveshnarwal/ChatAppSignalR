using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppSignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string username, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", username, message);
        }

        public async Task SendMessageToUser(string receiverid, string username, string message)
        {
            await Clients.Client(receiverid).SendAsync("ReceiveMessage", username, message);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
