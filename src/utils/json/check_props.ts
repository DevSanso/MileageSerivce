
export const checkProps = <T>(obj : any,props : Array<keyof T>) => 
props.every(value => obj.hasOwnProperty(value));






