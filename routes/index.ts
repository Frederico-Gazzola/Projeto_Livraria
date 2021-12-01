import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let livros_semana: any[];

		await app.sql.connect(async (sql) => {
			livros_semana = await sql.query("SELECT book_id, titulo, autor, descricao FROM book ORDER BY book_id DESC LIMIT 3");
		});

		let opcoes = {
			livros_semana: livros_semana
		};

		res.render("index/index", opcoes);
	}

	public async biblioteca(req: app.Request, res: app.Response) {
		let books: any[];

		await app.sql.connect(async (sql) => {
			books = await sql.query("SELECT book_id, titulo, autor, descricao FROM book ORDER BY book_id DESC");
		});

		let opcoes = {
			books: books
		};
		res.render("index/biblioteca", opcoes);
	}

	public async add_livro(req: app.Request, res: app.Response) {
		let opcoes = {
			criado: 2
		};
		res.render("index/add_livro", opcoes);
	}

	@app.http.post()
	@app.route.formData()
	public async criarLivro(req: app.Request, res: app.Response) {
		let livro = req.body;
		let opcoes = {};

		if (!livro) {
			opcoes['criado'] = 0;
			res.render("index/add_livro", opcoes);
			return;
		}
		if (!livro.titulo) {
			opcoes['criado'] = 0;
			res.render("index/add_livro", opcoes);
			return;
		}
		if (!livro.autor) {
			opcoes['criado'] = 0;
			res.render("index/add_livro", opcoes);
			return;
		}
		if (!livro.descricao) {
			opcoes['criado'] = 0;
			res.render("index/add_livro", opcoes);
			return;
		}
		if (!req.uploadedFiles || !req.uploadedFiles.foto || req.uploadedFiles.foto.size > 1024 * 1024) {
			opcoes['criado'] = 0;
			res.render("index/add_livro", opcoes);
			return;
		}

		await app.sql.connect(async (sql) => {
			await sql.beginTransaction();

			await sql.query("INSERT INTO book (titulo, autor, descricao) VALUES (?, ?, ?)", [livro.titulo, livro.autor, livro.descricao]);

			let id = await sql.scalar("SELECT last_insert_id()");
			await app.fileSystem.saveUploadedFile("public/book_cover/book" + id + ".jpg", req.uploadedFiles.foto);

			await sql.commit();
		});
		opcoes['criado'] = 1;
		res.render("index/add_livro", opcoes);
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

	public async review(req: app.Request, res: app.Response) {
		let book: any[];
		let review: any[];
		let book_id = req.query.book_id;

		await app.sql.connect(async (sql) => {
			book = await sql.query("SELECT book_id, titulo, autor, descricao FROM book WHERE book_id = ?", book_id);
			review = await sql.query("SELECT nota, review.descricao as descricao, user.nome FROM book " +
									"JOIN review ON book.book_id = review.book_id JOIN user ON review.user_id = user.user_id " +
									 "WHERE book.book_id = ?", book_id);
		});

		let opcoes = {
			book: book[0],
			review: review
		};
		res.render("index/review", opcoes);
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
		
		opcoes.resultado = 1;
		res.render("index/add_review", opcoes);
	}
}

export = IndexRoute;
