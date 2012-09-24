Manutenção completa com NodeJS, Jade, Mysql.


Implementação da alteração e exclusão de dados, completando o tutorial do blog http://labs.webdiastutoriais.com/2012/05/video-tutorial-comecando-nodejs-mysql-parte-2/

Banco e tabela no mysql:

--
-- Banco de Dados: `nodeapp`
--

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;


Coisa simple!! :D Primeira manutenção com banco de dados em Node  \o/



vlw
