export class Customer {
  constructor(
    public Email_id:string,
    public Password:string,
    public Full_name?:string,
    public Mobile?:string,
    public Address?:string,
    public City?:string,
    public Pincode?:number
  ) {}
}
