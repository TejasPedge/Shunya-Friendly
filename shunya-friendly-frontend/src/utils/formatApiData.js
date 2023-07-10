

export const formatApiData = (data) => {

    if(data.length === 0) {
        return [];
    }

    const formattedData = data.map((el) => {
        let obj = {};
        obj.key = el._id;
        obj.user_id = el._id;
        obj.name = el.name;
        obj.button1 = 'View';
        obj.button2 = 'Edit';
        obj.button3 = 'Delete';
        return obj
    });

    return formattedData;

}