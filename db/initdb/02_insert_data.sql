-- survey
INSERT INTO public.survey (id, title, description, created_at, updated_at, deleted_at) VALUES (1, '설문지', null, '2023-11-28 14:21:12.524957', '2023-11-28 14:21:12.524957', null);
INSERT INTO public.survey (id, title, description, created_at, updated_at, deleted_at) VALUES (2, '설문지2', null, '2023-11-28 14:21:18.140203', '2023-11-28 14:21:18.140203', null);
INSERT INTO public.survey (id, title, description, created_at, updated_at, deleted_at) VALUES (4, '설문지4', null, '2023-11-28 21:47:46.000000', '2023-11-28 21:48:10.261133', '2023-11-28 21:48:10.261133');
INSERT INTO public.survey (id, title, description, created_at, updated_at, deleted_at) VALUES (3, '설문지3', '지금!!!', '2023-11-28 14:21:21.959567', '2023-11-28 22:21:36.846749', null);

-- question
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (2, '문항2', null, 2, 1, '2023-11-28 14:22:40.341003', '2023-11-28 14:22:40.341003', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (3, '문항3', null, 3, 1, '2023-11-28 14:22:43.337882', '2023-11-28 14:22:43.337882', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (4, '문항1', null, 1, 2, '2023-11-28 14:22:46.800636', '2023-11-28 14:22:46.800636', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (5, '문항2', null, 2, 2, '2023-11-28 14:23:05.437207', '2023-11-28 14:23:05.437207', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (8, '문항3', null, 3, 3, '2023-11-28 14:23:15.824113', '2023-11-28 14:23:15.824113', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (9, '문항4', null, 4, 3, '2023-11-28 14:23:23.221590', '2023-11-28 21:48:38.442055', '2023-11-28 21:48:38.442055');
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (1, '지금!!!!', '설명', 1, 1, '2023-11-28 14:22:36.094216', '2023-11-28 22:14:17.614369', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (6, '문항1', null, 5, 3, '2023-11-28 14:23:10.815207', '2023-11-28 22:33:55.675231', null);
INSERT INTO public.question (id, title, description, order_number, survey_id, created_at, updated_at, deleted_at) VALUES (7, '문항2', null, 6, 3, '2023-11-28 14:23:13.192876', '2023-11-28 22:33:55.675231', null);

-- option
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (1, '선택지1', 1, 1, 1, '2023-11-28 14:25:11.509893', '2023-11-28 14:25:11.509893', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (3, '선택지1', 1, 1, 3, '2023-11-28 14:25:18.635561', '2023-11-28 14:25:18.635561', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (4, '선택지1', 1, 1, 4, '2023-11-28 14:25:21.874224', '2023-11-28 14:25:21.874224', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (5, '선택지1', 1, 1, 5, '2023-11-28 14:25:25.121376', '2023-11-28 14:25:25.121376', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (6, '선택지1', 1, 1, 6, '2023-11-28 14:25:29.125126', '2023-11-28 14:25:29.125126', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (7, '선택지1', 1, 1, 7, '2023-11-28 14:25:32.328015', '2023-11-28 14:25:32.328015', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (8, '선택지1', 1, 1, 8, '2023-11-28 14:25:37.044176', '2023-11-28 14:25:37.044176', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (11, '선택지2', 2, 2, 8, '2023-11-28 14:25:51.054208', '2023-11-28 14:25:51.054208', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (12, '선택지2', 2, 2, 7, '2023-11-28 14:25:54.575071', '2023-11-28 14:25:54.575071', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (13, '선택지2', 2, 2, 6, '2023-11-28 14:25:57.580458', '2023-11-28 14:25:57.580458', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (14, '선택지2', 2, 2, 5, '2023-11-28 14:26:00.795121', '2023-11-28 14:26:00.795121', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (15, '선택지2', 2, 3, 4, '2023-11-28 14:26:07.037612', '2023-11-28 14:26:07.037612', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (16, '선택지2', 2, 3, 3, '2023-11-28 14:26:10.765184', '2023-11-28 14:26:10.765184', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (9, '선택지1', 1, 1, 9, '2023-11-28 14:25:40.032074', '2023-11-28 21:48:38.442055', '2023-11-28 21:48:38.442055');
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (10, '선택지2', 2, 2, 9, '2023-11-28 14:25:47.792602', '2023-11-28 21:48:38.442055', '2023-11-28 21:48:38.442055');
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (18, '선택지2', 2, 3, 1, '2023-11-28 14:26:22.695542', '2023-11-28 21:49:10.312840', '2023-11-28 21:49:10.312840');
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (2, '선택지1', 44, 1, 2, '2023-11-28 14:25:16.311903', '2023-11-28 22:13:05.376367', null);
INSERT INTO public.option (id, content, order_number, score, question_id, created_at, updated_at, deleted_at) VALUES (17, '지금99', 33, 12, 2, '2023-11-28 14:26:13.657205', '2023-11-28 22:13:05.376367', null);

-- survey_answer
INSERT INTO public.survey_answer (id, user_code, survey_id, created_at, completed_at, deleted_at, updated_at) VALUES (1, 'jwoo', 1, '2023-11-28 16:17:29.956668', '2023-11-28 16:29:54.521460', null, '2023-11-28 16:29:54.521460');
INSERT INTO public.survey_answer (id, user_code, survey_id, created_at, completed_at, deleted_at, updated_at) VALUES (4, 'jwoo', 2, '2023-11-28 17:19:12.000000', null, null, '2023-11-28 17:19:15.000000');
INSERT INTO public.survey_answer (id, user_code, survey_id, created_at, completed_at, deleted_at, updated_at) VALUES (3, 'jwoo', 3, '2023-11-28 17:05:16.000000', '2023-11-28 17:09:02.000000', '2023-11-28 21:39:18.307740', '2023-11-28 21:39:18.307740');
INSERT INTO public.survey_answer (id, user_code, survey_id, created_at, completed_at, deleted_at, updated_at) VALUES (2, 'jwoo', 2, '2023-11-28 16:30:42.596473', '2023-11-28 16:36:03.788394', '2023-11-28 21:39:40.504499', '2023-11-28 21:39:40.504499');

-- question_answer
INSERT INTO public.question_answer (id, survey_answer_id, question_id, selected_option_id, created_at, updated_at, deleted_at) VALUES (1, 1, 1, 1, '2023-11-28 16:19:35.181696', '2023-11-28 16:19:35.181696', null);
INSERT INTO public.question_answer (id, survey_answer_id, question_id, selected_option_id, created_at, updated_at, deleted_at) VALUES (4, 2, 4, 15, '2023-11-28 16:31:55.610427', '2023-11-28 21:39:40.504499', '2023-11-28 21:39:40.504499');
INSERT INTO public.question_answer (id, survey_answer_id, question_id, selected_option_id, created_at, updated_at, deleted_at) VALUES (2, 1, 2, 17, '2023-11-28 16:20:07.825469', '2023-11-28 21:43:11.985283', '2023-11-28 21:43:11.985283');
INSERT INTO public.question_answer (id, survey_answer_id, question_id, selected_option_id, created_at, updated_at, deleted_at) VALUES (3, 1, 3, 3, '2023-11-28 16:20:35.231253', '2023-11-28 22:20:12.970472', null);
