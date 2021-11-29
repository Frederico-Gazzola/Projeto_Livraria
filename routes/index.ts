import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let livros_semana: any[];

		await app.sql.connect(async (sql) => {
			livros_semana = await sql.query("SELECT titulo, autor, descricao, foto FROM book LIMIT 3");
		});

		let opcoes = {
			livros_semana: livros_semana
		};

		res.render("index/index", opcoes);
	}

	public async biblioteca(req: app.Request, res: app.Response) {
		let books: any[];

		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT titulo, autor, descricao, foto FROM book");
		});

		let opcoes = {
			books: books
		};
		res.render("index/biblioteca", opcoes);
	}

	public async add_review(req: app.Request, res: app.Response) {
		let books: any[];

		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT book_id, titulo FROM book");
		});

		let opcoes = {
			books: books,
			resultado: 2
		};
		res.render("index/add_review", opcoes);
	}

	public async add_livro(req: app.Request, res: app.Response) {
		res.render("index/add_livro");
	}

	@app.http.post()
	public async criarLivro(req: app.Request, res: app.Response) {
		let livro = req.body;
		if (!livro) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}
		if (!livro.titulo) {
			res.status(400);
			res.json("Precisa de Titulo");
			return;
		}
		if (!livro.autor) {
			res.status(400);
			res.json("Precisa de Autor");
			return;
		}
		if (!livro.descricao) {
			res.status(400);
			res.json("Precisa de Descricao");
			return;
		}
		if (!livro.foto) {
			res.status(400);
			res.json("Foto Invalida");
			return;
		}

		await app.sql.connect(async (sql) => {
			await sql.query("INSERT INTO book (titulo, autor, descricao) VALUES (?, ?, ?, ?)", [livro.titulo, livro.autor, livro.descricao]);
		});
		res.render("index/add_livro");
	}

	@app.http.post()
	public async criarReview(req: app.Request, res: app.Response) {
		let review = req.body;
		let resultado = 0;
		let books;
		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT book_id, titulo FROM book");
		});

		let opcoes = {
			books: books,
			resultado: resultado
		};

		if (!review) {
			res.render("index/add_review", opcoes);
			return;
		}
		if (!review.nota) {
			res.render("index/add_review", opcoes);
			return;
		}
		if (!review.descricao) {
			res.render("index/add_review", opcoes);
			return;
		}
		if (!review.titulo) {
			res.render("index/add_review", opcoes);
			return;
		}
		review.nota = parseInt(review.nota)
		await app.sql.connect(async (sql) => {
			review['book_id'] = await sql.query("SELECT book_id FROM book WHERE titulo = ? ", review.titulo);
		});

		await app.sql.connect(async (sql) => {
			await sql.query("INSERT INTO review (nota, descricao, user_id, book_id) VALUES (?, ?, ?, ?)", [review.nota, review.descricao, 1, review.book_id[0].book_id]);
		});
		
		opcoes[resultado] = 1;

		res.render("index/add_review", opcoes);
	}
}

export = IndexRoute;
