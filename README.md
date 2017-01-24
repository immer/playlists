# Angular Top Songs

Thanks for the opportunity!

 
##Goals

I wanted to try and demonstrate a few of the practices I try and follow when it
come to front-end development.

---
> Abstracting business logic away from the framework

I've tried to abstract the business logic of this application away from the
framework (angular) as much as possible. I love angular, don't get me wrong.
I just believe it's wise to try and use the framework to glue together Plain old
JavaScript functions. I think there is an advantage is not relying unduly on
3rd party dependencies. And hey, the functional approach is all the rage these
days and can certainly lead to an enjoyable codebase to work with!

---
> Use the DOM, Luke

I am happy with the "form" (pun intended) of the DOM. Selections are made by
toggling checkboxes. A resource (held in memory on the client) is "patched". The
data is held in memory. It's all very RESTful and conventional as per an HTML
form, and could be transposed to a
server side implementation quite easily. (A point I only raise to highlight the
"extendability" of the implementation.)

---
> Lazy Eagerness

The JSON export feature is interesting inasmuch as it is "eagerly exported".
I.e., when the client-side resource is receives a write, the playlist is
exported asynchronously, which (were it not permanently visible in my UI), would
be available for the user the moment the requested it, rather than needing to be
generated on request. There could be performance considerations with large
playlists, but I doubt they would be insoluble.

##Instructions

The [playlist app](!http://repurpose.com.s3-website-us-east-1.amazonaws.com/views/playlist.html) is live!

*please visit the link above to see it in action*

###### Testing


    make clean test


###### Releasing


    make release

###### TODO

See the todos in the comments

