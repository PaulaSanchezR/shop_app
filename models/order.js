import moment from 'moment'

class Order {
    // id for the order
    constructor(id, items ,totalAmount,date){
        this.id=id;
        this.items=items;
        this.totalAmount=totalAmount;
        this.date=date;
    }

   // we can add a method  or call get to our model 
   get readableDate(){
       // conver the date to humand readable and also pass a object to configure the y d m


       //        return this.date.toLocaleDateString('en-EN',{
//            year:'numeric',
//            month:'long',
//            day:'numeric',
//            hour:'2-digit',
//            minute: '2-digit'

//        })
//    }
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
   }

}



export default Order;