const isMyCredit = (credits ,credit)=>{

    credits.forEach(element => {
        if(element==credit) return true;
    });

    return false;
}