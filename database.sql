CREATE TABLE weatherData (
    id serial primary key,
    temp varchar(255),
    tempLow varchar(255),
    tempHigh varchar(255),
    windSpeed varchar(255),
    comment varchar(255)
);