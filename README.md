## Ric's fruit shop

#### Live app
https://fruit-shop.herokuapp.com

#### Instructions
Make sure you have Postgres installed and running on your machine.

From the root folder, after running `yarn`, run `yarn setup`

That will create the database, run migrations and start both FE and BE servers.
`yarn start` for subsequent runs.


#### My comments

I have to admit that I spent more than the expected 2h on this... but it was just too much fun :)

Client side javascript is very easy to tamper with. Sites that deal with money (or any other sensitive data) should have all important calculations happen server-side, hence my decision to implement a little Node backend with a PostgresDB. Also, I wanted to show that I'm just as comfortable doing BE work - and having developers who are not afraid to debug an endpoint or optimize some SQL are always good to have in the team :-). There's some test coverage for the parts with more logic.

There's also a robust authentication system, based on JWTs and properly encrypted passwords (sprinkled with salt).

![](https://media.giphy.com/media/3o7P4F86TAI9Kz7XYk/giphy.gif)

One of the main challenges that I find when doing things R&D style (which I have been doing for close to 18 months) is deciding on a good compromise between development speed and future development speed. Often times, the proofs of concept (POC) we build will need to be rewritten and expanded. If when developing the first POC we spend extra time on the core bits to make it re-usable in the future, then the next iteration will be much faster and more pleasant.

That was my philosophy for this app. I tried to show some foresight when it comes to 'concept apps', and make certain parts flexible. If this was to be a full-scale app at some point, some of the heavy lifting is already done.

I don't have a lot of experience on paper, but I've been working day in day out alongside some incredible developers, from whom I've been soaking up all the knowledge I can. I've only just started walking in the world of development, but hopefully this code test shows that I have a good basis on which to build, allowing a team like R3PI (hopefully R3PI! ;)) to shape me into the team member they need.

Thank you so much for this opportunity, R3PI. I look forward to hearing from you soon.

Kind regards,

Ric

P.S - Sorry for having the salt guy distract you all this time
