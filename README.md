# quasar-typescript-composition
An example of using typescript and Vue composition API with Quasar

This is an example of how I am setting up my [Quasar project](quasar.dev) to use typescript and the composition API. It might be useful for others who are starting out on the same path and I would love to get feedback from anybody who has done this already.

The important files to look at are the files that belong to the EssentialLink component in the [components directory](https://github.com/gregveres/quasar-typescript-composition/tree/master/src/components). 

The structure I am following for the typescript class was inspired by [Drew Colthorp in this article](https://spin.atomicobject.com/2017/10/26/typescript-functional-module-pattern/). 

Basically, the gist of it is that the "class" that is being created in typescript as the model is defined in the EssentialLinkViewModel.ts file. The file creates a module instead of a class and the key thing is to define a "Type" type that is the interface of the module's data. You have a create method that returns the data and the module mechanism of typescript then allows you to call the methods from the module as if they were static methods of a class. (They are really just scoped to the namespace of the module).

So once I import the module with: 
```
import * as EssentialLinkViewModel from '...EssentialLinkViewModel';
```
I can then define a variable of type EssentialLinkViewModel like this:
```
const vm: EssentialLinkViewModel.Type = EssentialLinkViewModel.create(...);
```

The *Type* was key because I often define a variable of the view model type in beginning of my unit tests and then use it repeatedly throughout the tests. Before I found Drew's pattern, I couldn't define that type properly in the unit tests when using the composition API. Take a look at the [unit test](https://github.com/gregveres/quasar-typescript-composition/blob/master/src/components/EssentialViewModel.unit.ts) to see what I mean. This unit test was too simple to require me to create the variable, but I created it anyway to show that I can define its type using *Type* from the module. 

# Things I have learned combining typescript and Vue Composition API in Quasar
1. Even if you don't have props for a component, you need to define the field Props: {} in your component, or you will get an error while compiling because your component doesn't match some type definition somewhere. So now I have a VS Code snippet that creates a new component for me that just automatically puts in a an empty props.
1. If you are trying it out for the first time and the fields from your setup return are not available in your template, it is because you forgot to instantiate the composition api plugin. Look at the notes below on the steps I followed for creating the project on how to do this
1. The composition API is a good step forward for people who want to be able to unit test their view model's independant of the view. it seems like a reasonable way to extract the code out of the view. And since it seems that the majority of the Vue community is against TS classes, the above module approach appears to be a good middle ground. 

# Creating the project
I created the project with quasar create:
```
$ quasar create
```
and then I added the typescript extension:
```
$ quasar ext add @quasar/typescript
```

Because I had selected i18n, I had to add a couple of lines to the i18n boot file to prevent an error because app is defined as any. 
Then I had to add a boot file for the [composition api package](https://github.com/vuejs/composition-api). You can see the boot file [here](https://github.com/gregveres/quasar-typescript-composition/blob/master/src/boot/composition-api.ts) and the config change to add the boot file [here](https://github.com/gregveres/quasar-typescript-composition/blob/master/quasar.conf.js).

I did not setup the project with unit testing, even though I provided a sample unit test. Sorry about that. You can add unit testing by following the [docs](https://quasar.dev/quasar-cli/testing-and-auditing#Testing-documentation)
