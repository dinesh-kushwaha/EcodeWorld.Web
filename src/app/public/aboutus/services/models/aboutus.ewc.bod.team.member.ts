export class BODMembers{
    id:number;
    title:string;
    description:string;
    keywords:string;
    name:string;
    companyName:string;
    degignation:string;
    speciality:string;
    qualifications:Array<Qualification>
    certifications:Array<Certification>
}

export class Qualification  {
    id:number;
    name:string;
    University:string;
    Country:string;
    Date:Date;
    ValidFrom:Date;
    ValidTo:Date;
    Order:number;
}

export class Certification  extends Qualification {
    
}