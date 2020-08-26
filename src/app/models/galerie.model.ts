export class Galerie {
    id?:number;
    name?:string;
    link?:string;
    keyword?:string;
    stand_id?:number;
    data_img?:File;
    
    constructor(id:number,name:string,link:string,keyword: string,stand_id:number,data_img:File){
        this.id=id;
         this.name=name;
         this.link=link;
         this.keyword=keyword;
         this.stand_id=stand_id;
         this.data_img=data_img;
     }
}
