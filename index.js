const express = require('express');
const app= express();
const path=require('path');
const fs=require('fs');
const { render } = require('ejs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        res.render("index",{files:files});
    });
        
});
app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render('show',{filename: req.params.filename, filedata: filedata});
        
    });
   
});

app.get('/edit/:editfile',(req,res)=>{

    fs.readFile(`./files/${req.params.editfile}`,"utf-8",(err,filedata)=>{
        res.render('edit',{editfile:req.params.editfile,filedata:filedata});
        app.post('/update',(req,res)=>{
            

            fs.writeFile(`./files/${req.body.titles.slice('.txt')}`,req.body.details,(err)=>{
                res.redirect('/');
                
            });
            
        });
       

    });

    
});

app.get('/delete/:delete',(req,res)=>{
    fs.unlink(`./files/${req.params.delete}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        
        res.redirect('/')
      });
})




app.post('/create',(req,res)=>{

    fs.writeFile(`./files/${req.body.titles.split(' ').join(' ')}.txt`,req.body.details,(err)=>{
        res.redirect('/');
    });
    
});




var PORT=5712
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
});