using System;
using Microsoft.AspNetCore.SignalR;

namespace StockPriceAPI.Hubs;

public class StockHub : Hub
{
    public async Task SendStockPrice(string stockName, decimal price)
    {
        await Clients.All.SendAsync("ReceiveStockPrice", stockName, price);
    }    
}
