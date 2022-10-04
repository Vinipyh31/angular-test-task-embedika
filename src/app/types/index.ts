export interface IShip {
    name: string;
    id: string;
    type: string;
    home_port: string;
    year_built: number;
    weight_kg: number;
    missions: {
        name: string;
    }[];
}