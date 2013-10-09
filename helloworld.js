function foo()
{
	console.log("hello");
	setTimeout(bar,2000);
}
function bar()
{
	console.log("world");
	throw new Error("hit a problem");
}


setInterval(foo,5000)
