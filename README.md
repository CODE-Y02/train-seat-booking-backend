# train-seat-booking-backend

## client REPO AND URL 
- [client Repo](https://github.com/CODE-Y02/train-seat-booking-client)
- [LIVE URL](https://train-seat-booking-client.onrender.com/)

## setup intstruction ;

> clone project and do npm i to install all packages
> create .env and add db_uri=< POSTGRESQL URI >
> do npm start



## Assumption

> I am assuming no gap between seats and only single pathway
> First Seat of most previous vacent row will be filled and then new row &  seats are allocated


## end points

> "status" --> will give total seats and available seats in coach
> "bookingStatus" --> will give all seats row wise 

> "/reset" --> for admin to reset coach status

> "/book" --> will accept no of seats and allocatte it

> "/" --> 404
