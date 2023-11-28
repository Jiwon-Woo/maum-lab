create table survey
(
    id          serial
        constraint "PK_f0da32b9181e9c02ecf0be11ed3"
            primary key,
    title       varchar(255)            not null,
    description varchar(255),
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null,
    deleted_at  timestamp
);

create table question
(
    id           serial
        constraint "PK_21e5786aa0ea704ae185a79b2d5"
            primary key,
    title        varchar(255)            not null,
    description  varchar(255),
    order_number integer                 not null,
    survey_id    integer                 not null
        constraint "FK_a74e5e8dfbf68d7d1cd39c8c9fc"
            references survey,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null,
    deleted_at   timestamp
);

create table option
(
    id           serial
        constraint "PK_e6090c1c6ad8962eea97abdbe63"
            primary key,
    content      varchar(255)            not null,
    order_number integer                 not null,
    score        integer                 not null,
    question_id  integer                 not null
        constraint "FK_790cf6b252b5bb48cd8fc1d272b"
            references question,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null,
    deleted_at   timestamp
);

create table survey_answer
(
    id           serial
        constraint "PK_5a2a931b95ad2a866f8bc039db9"
            primary key,
    user_code    varchar(255)            not null,
    survey_id    integer                 not null
        constraint "FK_ca5d0e0e096f8874883140eac9c"
            references survey,
    created_at   timestamp default now() not null,
    completed_at timestamp(6),
    updated_at   timestamp default now() not null,
    deleted_at   timestamp
);


create table question_answer
(
    id                 serial
        constraint "PK_c1e064f8949efd78ad3c66059ba"
            primary key,
    survey_answer_id   integer                 not null
        constraint "FK_ccb1b6acc85ebf97969ecc6a9f7"
            references survey_answer,
    question_id        integer                 not null
        constraint "FK_378c4919890f42e6b94c9d37049"
            references question,
    selected_option_id integer                 not null
        constraint "FK_edbb527cdaa03bbffa274012cb2"
            references option,
    created_at         timestamp default now() not null,
    updated_at         timestamp default now() not null,
    deleted_at         timestamp
);