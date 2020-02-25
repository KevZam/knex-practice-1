BEGIN;

INSERT INTO blogful_articles 
    (title, date_published, content)
VALUES 
    ('DummyTitle1', now() - '29 days'::INTERVAL, 'DummyContent1'),
    ('DummyTitle2', now() - '28 days'::INTERVAL, 'DummyContent2'),
    ('DummyTitle3', now() - '27 days'::INTERVAL, 'DummyContent3'),
    ('DummyTitle4', now() - '26 days'::INTERVAL, 'DummyContent4'),
    ('DummyTitle5', now() - '25 days'::INTERVAL, 'DummyContent5'),
    ('DummyTitle6', now() - '24 days'::INTERVAL, 'DummyContent6'),
    ('DummyTitle7', now() - '23 days'::INTERVAL, 'DummyContent7'),
    ('DummyTitle8', now() - '22 days'::INTERVAL, 'DummyContent8'),
    ('DummyTitle9', now() - '21 days'::INTERVAL, 'DummyContent9'),
    ('DummyTitle10', now() - '20 days'::INTERVAL, 'DummyContent10');

COMMIT;