    You are familiar with looping and branching
    You can make and update variables
    You can call functions
    You can create named global functions, similar to the standard setup and draw in p5
    You can do some math in JavaScript
    The API has been carefully updated so that you don't need more than that to start. You do not need to know about the shader pipeline, uniforms, varying variables, or anything like that at first. You will still learn those things! But they are not required upfront like they would otherwise be; they stay out of the way until you need them.

    Level 0: The built-in filters are shaders (e.g., filter(BLUR))

    Level 1: filter() and buildFilterShader() with hooks: filterColor & getTexture()

    Level 2+ JS/p5.js prerequisites - 3D modeling 101:
    Using coordinates in a sketch
    model() and build-in models plane, box, cylinder, cone, sphere, ellipsoid
    Optional: Custom models with loadModel() and buildGeometry()
    Optional: Models based on text using textToModel() (may need woff2 add-on)

    Level 2: shader() & buildColorShader() with hooks: objectInputs, worldInputs, cameraInputs, finalColor. To make use of objectInputs, worldInputs, and cameraInputs, the 

    Level 3: buildNormalShader() with all of the above hooks (objectInputs, worldInputs, cameraInputs, finalColor)

    Level 4: buildStrokeShader() + strokeShader() + hooks (objectInputs, worldInputs, cameraInputs, finalColor, pixelInputs)

    Level 5+ JS/p5.js prerequisites:
    mouseX, mouseY, frameCount, millis(), width, height, random(), noise(), lerp(), map(), sin(), cos()

    Level 5: buildMaterialShader()  all of the above hooks plus combineColors, instanceID() (e.g.)

    Level 6: Passing in variables: setUniform() (notably, not a prereq for anything)

    Level 7: Using compute shaders: createStorage(), buildComputeShader(), compute()
