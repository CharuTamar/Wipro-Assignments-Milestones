using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using StockPriceAPI.Hubs;

namespace StockPriceAPI.Services;

public class StockService
{
    private readonly IHubContext<StockHub> _hubContext;
    private readonly Random _random = new();
    public StockService(IHubContext<StockHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public void StartUpdatingStockPrices()
    {
        new Thread(async () =>
        {
            while (true)
            {
                string[] stocks = { "AAPL", "GOOG", "MSFT", "AMZN" };
                foreach (var stock in stocks)
                {
                    decimal newPrice = _random.Next(100, 500);
                    await _hubContext.Clients.All.SendAsync("ReceiveStockUpdate", stock, newPrice);
                }
                Thread.Sleep(3000); // Update every 3 seconds
            }
        }).Start();
    }
}
