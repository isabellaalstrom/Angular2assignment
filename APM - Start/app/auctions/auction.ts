//interface
export interface IAuction {
        id: number;
        name: string;
        description: string;
        startTime: Date;
        endTime: Date;
        imageUrl: string;
        categoryId: number;
        supplierId: number;
        buyNowPrice: number;
        sold: boolean;
}