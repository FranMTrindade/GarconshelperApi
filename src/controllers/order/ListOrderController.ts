import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderServices";

class ListOrderController{

    async handle(req: Request, res: Response){
        const listOrderservice = new ListOrderService()

        const orders = await listOrderservice.execute();

        return res.json(orders);
    }
}

export {ListOrderController}