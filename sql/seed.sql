USE livraria;

-- DELETE FROM book WHERE book_id = 1;  Deleta Livro Especifico
DELETE FROM review WHERE review_id;
DELETE FROM book WHERE book_id;  -- Deleta Todos Livros
DELETE FROM user WHERE user_id;  -- Deleta Todos Usuarios

INSERT INTO book (titulo, autor, descricao, foto) 
            values ("O Nome Do Vento", "Patrick Rothfuss", "Ninguém sabe ao certo quem é o herói ou o vilão desse fascinante universo criado por Patrick Rothfuss. Na realidade, essas duas figuras se concentram em Kote, um homem enigmático que se esconde sob a identidade de proprietário da hospedaria Marco do Percurso.Da infância numa trupe de artistas itinerantes, passando pelos anos vividos numa cidade hostil e pelo esforço para ingressar na escola de magia, O nome do vento acompanha a trajetória de Kote e as duas forças que movem sua vida: o desejo de aprender o mistério por trás da arte de nomear as coisas e a necessidade de reunir informações sobre o Chandriano - os lendários demônios que assassinaram sua família no passado.Quando esses seres do mal reaparecem na cidade, um cronista suspeita de que o misterioso Kote seja o personagem principal de diversas histórias que rondam a região e decide aproximar-se dele para descobrir a verdade. Pouco a pouco, a história de Kote vai sendo revelada, assim como sua multifacetada personalidade - notório mago, esmerado ladrão, amante viril, herói salvador, músico magistral, assassino infame. Nesta provocante narrativa, o leitor é transportado para um mundo fantástico, repleto de mitos e seres fabulosos, heróis e vilões, ladrões e trovadores, amor e ódio, paixão e vingança. Mais do que a trama bem construída e os personagens cativantes, o que torna O nome do vento uma obra tão especial - que levou Patrick Rothfuss ao topo da lista de mais vendidos do The New York Times - é sua capacidade de encantar leitores de todas as idades.", "book1.jpg");
INSERT INTO book (titulo, autor, descricao, foto)
            values ("As Cronicas de Narnia", "C. S. Lewis", "Em Nárnia, o inverno é eterno nunca há Natal. Centauros, faunos, gigantes e outros animais falantes vivem infelizes com a maldição, declarada na ausência do Leão Aslam, que agora retorna ao reino ao lado das crianças. Juntos, todos irão lutar para acabar com a profecia de Jadis e liberar o local do domínio do mal." , "book2.jpg");
INSERT INTO book (titulo, autor, descricao, foto) 
            values ("O Ladrão de Raios", "Rick Riordan", "Um artefato precioso foi roubado do Monte Olimpo e Percy é o principal suspeito. Para restaurar a paz, ele e seus amigos – jovens heróis modernos – terão de fazer mais do que capturar o verdadeiro ladrão: precisam elucidar uma traição mais ameaçadora que fúria dos deuses.", "book3.jpg");

INSERT INTO user (nome, email, senha) values ("user", "user@gmail.com", "123");
INSERT INTO user (nome, email, senha) values ("leon", "leon@gmail.com", "123");

INSERT INTO review (nota, descricao, book_id, user_id) values (3, "Livro Interessante", 1, 1);
INSERT INTO review (nota, descricao, book_id, user_id) values (5, "Muito Bom!", 2, 2);