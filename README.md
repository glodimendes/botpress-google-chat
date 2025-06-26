# Botpress and Google Chat integration

This is my current version of my "personalized" botpress integration. 

It changes some aspects from Botpress's own google chat integration but to focus on threaded replies by the bot (all replies are sent in the same thread, where the incoming message came from). 

For this a "little" trick was necessary: passing the "threadName" inside "spaceId" to bypass the tag limitations for the conversation. 

## Next Steps:
1. Figure out how to solve tag limitations.
2. Correct the implementation passing threadName directly.
3. Document the integration properly.
4. Make the solution more elegant and useful (include selector options for replies and others).
