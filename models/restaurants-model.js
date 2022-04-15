module.exports={
   
    fetchrestaurants:function(){
         data="restuants";
         return data;
    },
    fetchCrud:function(){
      data="data was fetched";
      return data;   
    },
    editCrud:function(editData){
      data= "Data is edited by id: "+editData;
      return data; 
    },
    UpdateCrud:function(updateId){
      data= "Data was updated by id: "+updateId;
      return data; 
    },
    deleteCrud:function(deleteId){
      data= "Data was deleted by id: "+deleteId;
      return data; 
    }
  }