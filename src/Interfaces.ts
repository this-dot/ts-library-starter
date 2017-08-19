export type IPath = Array<IIndex>;
export type IIndex = string | number;
export type IData = {} | Array<any>;
export type IReduceCallback = (accumulator: any, currentValue: any, currentIndex: IIndex) => any;
export type IFilterCallback = (value: any, key: IIndex) => boolean;
export type IMapCallback = (value: any, key: IIndex) => any;
