const bodyParser = require('body-parser'),
	express = require('express'),
	cors = require('cors'),
	// favicon = require('serve-favicon'),
	logger = require('morgan'),
	path = require('path'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session');

const { config } = require('./src/config/config-app'),
	adminRoutes = require('./src/routes/route-admin'),
	onlyAdminRoutes = require('./src/routes/routes-only-admin'),
	downloadRoutes = require('./src/routes/route-download'),
	dummyApi = require('./src/routes/route-dummy-api');
const fileUpload = require('express-fileupload');

const app = express();
const CustomError = require('./src/controllers/controller-error'),
	cError = new CustomError();
require('./src/config/config-db');
require('./src/config/config-passport');
app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(
	session({
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	fileUpload({
		debug: true,
		limits: { fileSize: 3500000 },
		uriDecodeFileNames: true,
		safeFileNames: true,
		preserveExtension: true,
		abortOnLimit: true,
		parseNested: true,
		responseOnLimit: '¡La imagen no puede pesar más de 3.5MB!',
	})
);
app.use(adminRoutes);
app.use(onlyAdminRoutes);
app.use(downloadRoutes);
app.get('*', cError.Default.bind(cError));

const server = app.listen(app.get('port'), function () {
	console.log(`Listening http://localhost:${server.address().port}`);
});
