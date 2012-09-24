
/**
 * Module dependencies.
 */

var express = require('express')
  , mysql = require('mysql')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//variaveis mysql
var database = 'nodeapp';
var table    = 'produtos';

//conexão com banco de dados
var client = mysql.createClient({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306
});

//abre banco de dados
client.query('USE '+database);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//rota principal
app.get('/', routes.index);

//lista produtos
app.get('/produtos', function(req, res) {
  client.query (
    'SELECT * FROM '+table,
    function(err,results,fields) {
      if( err ) {
         throw err;
      }
    //res.send(results);
    res.render('lista_produtos',{
      produtos: results,
      title: 'Lista de produtos'
    })

    }
  )
});

//mostra um produto em particular
app.get('/produtos/view/:id', function(req, res) {
  client.query(
    'SELECT * FROM '+table+' WHERE id = '+req.params.id+' ',
    function(err, results, fields) {
      if( err ) {
         throw err;
      }
      res.render('produto_singular',{
      produto: results,
      title: 'Produto singular'
    })

    })

});

//mostra formulario de inclusão de produtos
app.get('/produtos/add', function(req, res) {
  res.render('form_produtos', {
    title: 'Cadastrar produto'
  })
});

//processa inclusao do produto
app.post('/produtos/add', function(req, res) {
  var nome = req.body.produto.nome;
  client.query(
    'INSERT INTO '+table+' '+
    'SET nome = ?',
    [nome]
  );
  res.redirect('/produtos')

});

//apaga um produto
app.get('/produtos/del/:id', function(req, res) {
  client.query(
    'DELETE FROM '+table+' '+
    'WHERE id = ?',
    [req.params.id]
  );
  res.redirect('/produtos')

});

//edita um produto
app.get('/produtos/edit/:id', function(req, res) {
  client.query(
    'SELECT * FROM '+table+' WHERE id = '+req.params.id+' ',
    function(err, results, fields) {
      if( err ) {
         throw err;
      }
      res.render('alterar_produto',{
      produto: results,
      title: 'Alterando produto'
    })

    })
});

//grava alterações do produto
app.post('/produtos/edit', function(req, res) {
  var nome = req.body.produto.nome;
  var id = req.body.produto.id;
  client.query(
    'UPDATE '+table+' '+
    'SET nome = ?'+
    'WHERE id = ?' ,
    [nome, id]
  );
  res.redirect('/produtos')

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
