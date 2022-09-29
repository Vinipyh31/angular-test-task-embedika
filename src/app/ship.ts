export interface IShip {
    name: string;
    type: string;
    home_port: string;
    year_built: number;
    weight_kg: number;
    missions: {
        name: string;
    }[];
}