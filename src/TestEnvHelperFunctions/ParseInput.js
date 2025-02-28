function parseInput(inputStr) {
    const inputObj = {};
  
    // Step 1: Split the input by commas to separate the key-value pairs.
    const pairs = inputStr.split(',');
  
    pairs.forEach(pair => {
      // Step 2: Split each pair by the equals sign to separate key and value.
      const [key, value] = pair.trim().split('=');
  
      if (!key || !value) {
        console.error(`Invalid pair: ${pair}`);
        return; // Skip invalid pair
      }
  
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
  
      // Step 3: Handle different types of values
      if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
        // Handle arrays (e.g., [1,2,3])
        inputObj[trimmedKey] = JSON.parse(trimmedValue);
      } else if (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) {
        // Handle objects (e.g., {a:1, b:2})
        inputObj[trimmedKey] = JSON.parse(trimmedValue);
      } else if (
        (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
        (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
      ) {
        // Handle strings (e.g., "hello" or 'world')
        inputObj[trimmedKey] = trimmedValue.slice(1, -1);
      } else {
        // Handle numbers
        inputObj[trimmedKey] = isNaN(trimmedValue) ? trimmedValue : parseFloat(trimmedValue);
      }
    });
  
    return inputObj;
  }