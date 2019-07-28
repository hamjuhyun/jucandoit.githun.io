const product = [
    { price: "1000", name: "껌", id :"1", page : "1" },
    { price: "2000", name: "과자", id :"2", page : "1" },
    { price: "3000", name: "음료수", id :"3", page : "1" },
    { price: "4000", name: "커피", id :"4", page : "2" },
    { price: "5000", name: "피자", id :"5", page : "2" },
    { price: "6000", name: "치킨", id :"6", page : "2" },
    { price: "7000", name: "대왕치킨", id :"7", page : "3"},
    { price: "8000", name: "대왕피자", id :"8", page : "3"},
]

module.exports = function (app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });

    app.get('/api/getProduct', function (req, res) {
        const {page} = req.query;
        let pd = product;
        if (page) {
            pd = product.filter(data => page == data.json)
        }
        res.json({product : pd});
        res.json(pd);

        res.status(200).end();
    });

    app.post('/api/selectId', function (req, res) {
        const {id} = req.body;
        let pd = product;
        if (id) {
            pd = product.filter(data => id == data.id)
        }
        res.json(pd);
        res.status(200).end();
    });
}
