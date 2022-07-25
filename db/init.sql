CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    img varchar(255) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    description varchar(255) NOT NULL,
    img varchar(255) NOT NULL,
    "categoryId" INTEGER,
    FOREIGN KEY ("categoryId") REFERENCES categories (id)
);
CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER,
    "productId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "users" (id),
    FOREIGN KEY ("productId") REFERENCES products (id)
);
CREATE TABLE IF NOT EXISTS "orders" (
    id SERIAL PRIMARY KEY,
    "buyerName" varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "users" (id)
);
CREATE TABLE IF NOT EXISTS calories (
    id SERIAL PRIMARY KEY,
    norm_in_day INTEGER NOT NULL DEFAULT 0,
    eaten_today INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "users" (id)
);
CREATE TABLE IF NOT EXISTS dishes (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    calories INTEGER NOT NULL,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "users" (id)
);
CREATE TABLE IF NOT EXISTS workouts (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    img varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    img varchar(255) NOT NULL,
    description varchar(255),
    "workoutId" INTEGER,
    FOREIGN KEY ("workoutId") REFERENCES "workouts" ("id")
);

DELETE FROM "users";
DELETE FROM categories;
DELETE FROM products;
DELETE FROM carts;
DELETE FROM "orders";
DELETE FROM calories;
DELETE FROM dishes;
DELETE FROM workouts;
DELETE FROM exercises;

INSERT INTO categories (id, name, img) VALUES (1, 'Протеин', 'protein.jpg');
INSERT INTO categories (id, name, img) VALUES (2, 'Батончики и снеки', 'bars_and_snacks.jpg');
INSERT INTO categories (id, name, img) VALUES (3, 'Аминокислоты', 'amino_acids.jpg');
INSERT INTO categories (id, name, img) VALUES (4, 'Витамины', 'vitamins.jpg');

INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (1, 'Сывороточный протеин', 2799,  'Первоклассная сыворотка, каждая порция которой содержит 21 г белка (продукт с натуральным вкусом), полученного из качественного источника - коровьего молока, из которого производятся все молочные продукты, попадающие на ваш обеденный стол.', 'protein_1.jpg', 1 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (2, 'Протеиновый батончик', 150,  'Перекусывайте еще вкуснее с этим аппетитным батончиком с 6 слоями. Вкус и текстура, перед которыми сложно устоять. Много белка и мало сахара. Идеальный вариант закуски, которой можно насладиться на бегу.', 'protbar_1.jpg', 2 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (3, 'Протеин для веганов', 2499,  'Vegan Protein Blend –  растительный протеин, состав которого мы недавно обновили. Мы знаем, что вы отдаете особое предпочтение этому продукту, благодаря его отличной питательной ценности. ', 'protein_2.jpg', 1 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (4, 'Протеиновая смесь', 2899,  'Эта смесь содержит высококачественный белок из семи различных источников. В одной порции содержится целых 24 г белка — превосходная поддержка во время тренировок для достижения любых спортивных целей.', 'protein_3.jpg', 1 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (5, 'Комплексный протеин ', 2399,  'Комплексный протеин для веганов, состав которого мы обновили. Мы знаем, что этот продукт нравился вам из-за его отличной питательной ценности. ', 'protein_4.jpg', 1 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (6, 'Смесь для восстановления ', 4499,  'Уникальный состав этого продукта позволяет ускорить восстановление организма.1 В его состав входят гидролизованная сыворотка, изолят с углеводами, креатин и уникальный комплекс витаминов и минералов. ', 'protein_5.jpg', 1 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (7, 'Протеиновое печенье', 2500,  'Отличное лакомство с высоким содержанием протеина (38 г белка), при приготовлении которого не использовались вредные ингредиенты. Вашему вниманию мы предлагаем семь аппетитных вкусов, включая «Двойной шоколад» и «Rocky Road».', 'protbar_2.jpg', 2 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (8, 'Протеиновые вафли', 1999,  'Содержит на 60 % меньше сахара и на 20 % меньше жиров чем аналогичные продукты, продающиеся в супермаркетах. Наслаждайтесь лакомством с высоким содержанием белка, которое не окажет негативного влияния на результаты ваших тренировок.', 'protbar_3.jpg', 2 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (9, 'Домашнее печенье', 2299,  'Это печенье выпекается из качественных ингредиентов, включая кокосовое масло, шоколадную крошку и гороховый протеин. Продукт полностью подходит для веганов.', 'protbar_4.jpg', 2 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (10, 'Диетическое печенье', 2099,  'Это вкусное печенье содержит на 80% меньше сахара и на 70% меньше жира по сравнению с аналогичными продуктами из супермаркетов. Вы можете полакомиться им, даже если соблюдаете строгую спортивную диету.', 'protbar_5.jpg', 2 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (11, 'Основные аминокислоты BCAA 2:1:1', 2099,  'В этих удобных таблетках содержится смесь основных аминокислот (лейцина, изолейцина и валина). Они в натуральном виде содержатся в белке, который помогает наращивать и укреплять новые мышцы', 'amin_1.jpg', 3 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (12, 'Аминокислота гидроксиметилбутират (HMB)', 1699,  'Гидроксибетаметилбутират, более широко известный под аббревиатурой HMB, является метаболитом лейцина (аминокислоты с разветвленной цепью). HMB широко применяется в качестве компонента многих добавок комплексного действия.', 'amin_2.jpg', 3 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (13, 'Аминокислота NAC (N-Ацетил-L-Цистеин)', 1549,  'N-ацетил-L-цистеин (NAC) является аминокислотой природного происхождения, которая поможет вам в достижении ваших спортивных целей. Аминокислота 100% NAC представлена в очень удобной форме растворимого порошка.', 'amin_3.jpg', 3 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (14, 'Витамины группы B', 1399,  'Мощная смесь незаменимых витаминов группы В включает в себя тиамин, рибофлавин, ниацин, фолиевую кислоту, витамины В6 и В12, биотин и пантотеновую кислоту. ', 'vit_1.jpg', 4 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (15, 'Витамин E', 1599,  'Витамин E — незаменимый витамин, который играет жизненно важную роль во многих процессах, протекающих в организме. Он является природным антиоксидантом.', 'vit_2.jpg', 4 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (16, 'Витамин D3 Elite', 1199,  'Обеспечивать организм необходимой суточной дозой витамина D не так-то просто, поскольку его натуральным источником являются, главным образом, солнечные лучи, при этом в большинстве пищевых продуктов он отсутствует. ', 'vit_3.jpg', 4 );
INSERT INTO products (id, name, price, description, img, "categoryId") VALUES (17, '100% витамин C', 699,  'Витамин C необходим для решения всех спортивных задач, поскольку он поддерживает работу иммунной системы после тренировки. Этот порошок идеально подходит для  всех, кто хочет легко увеличить потребление витамина С.', 'vit_4.jpg', 4 );

INSERT INTO workouts (id, name, img) VALUES (1, 'Силовая тренировка на всё тело', '1.jpg');
INSERT INTO workouts (id, name, img) VALUES (2, 'Кардио тренировка', '2.jpg');
INSERT INTO workouts (id, name, img) VALUES (3, 'Тренировка ног', '4.jpg');

INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (1, 'Отжимания', '1.jpg', 'Принимаем упор лёжа на вытянутых руках, ладони по вертикальной оси находятся на уровне плеч. Затем сгибаем руки до касания телом пола и «выталкиваем» тело обратно вверх до полного разгибания рук.  Ваши ноги и корпус должны составлять прямую линию.', 1);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (2, 'Приседания', '2.jpg', 'Расположите ступни чуть шире плеч и слегка прогните поясницу. Носки и колени должны быть на одном уровне. Руки можно вытянуть вперёд или развести в стороныНа вдохе опустите таз, чтобы он был параллелен полуНа выдохе вернитесь в исходное положение', 1);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (3, 'Берпи', '3.gif', 'Лягте на пол лицом вверх, руки подложите за голову, локти разведите в стороны. Усилием мышц брюшного пресса начинайте поднимать (не рывком) плечевой пояс от пола по направлению к тазу. Из верхней точки медленно вернитесь в исходную позицию. ', 2);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (4, 'Планка', '4.jpg', 'Планка выполняется из начальной позиции отжиманий, только локти должны быть согнуты под прямым углом и находиться на одной линии с плечами. Ваше тело должно быть выпрямлено. Не прогибайте поясницу и не задирайте таз кверху. ', 1);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (5, 'Классические скручивания', '5.jpg', 'Лягте на пол лицом вверх, руки подложите за голову, локти разведите в стороны. Усилием мышц брюшного пресса начинайте поднимать (не рывком) плечевой пояс от пола по направлению к тазу. Из верхней точки медленно вернитесь в исходную позицию. ', 1);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (6, 'Болгарские выпады', '6.jpg', 'Подойдите спиной к скамье, сделайте шаг вперед, после чего положите заднюю ногу на скамью. Зафиксировав положение, медленно присаживайтесь до уровня параллели между полом и бедром.  На выдохе возвращайтесь в исходную фазу.', 1);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (7, 'Бег на месте', '7.gif', 'Руки согнуты в локтях и прижаты к торсу, плачи опущены и расслаблены. Поочередно передвигайте ноги для создания имитации пробежки. Не опирайтесь на пятки. Колени приподнимайте выше для увеличения эффективности занятия.', 2);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (8, 'Махи гирей перед собой', '8.gif', ' Примите исходное положение, поставив ноги на ширине плеч.  Мощным разгибанием ног и спины толкните снаряд вперед, используя инерцию, и поднимите его на прямых руках перед собой.', 2);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (9, 'Бег в упоре лежа', '9.gif', 'Примите горизонтальное положение на выпрямленных руках. Выдыхая, согните одну ногу в колене и подтяните её максимально к груди. При этом старайтесь напрягать мускулатуру кора. На вдох вернитесь в начальное положение. ', 2);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (10, 'Наклоны с отведением ноги назад', '10.gif', 'Напрягите пресс и начинайте медленно наклоняться вперед, отводя выпрямленную правую ногу назад. Наклоняйтесь, пока корпус и правая нога не образуют прямую линию, параллельную полу. Затем медленно вернитесь в исходное положение.', 3);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (11, 'Выпрыгивания из приседа', '11.gif', 'Из положения приседа сделайте выпрыгивание вертикально вверх, с полным выпрямлением ног. Во время движения прямые руки уходят назад. Приземление идет сразу в положение приседа.', 3);
INSERT INTO exercises (id, name, img, description, "workoutId") VALUES (12, 'Выпад-реверанс', '12.gif', 'Отведите левую ногу назад, выполняя обратный выпад, при этом нога заводится чуть глубже вправо, чтобы получился реверанс.  Вернитесь в исходное положение. Теперь сделайте аналогичный выпад правой ногой. Это одно повторение.', 3);
