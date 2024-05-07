function useConstInBlocks() {
  {
    const x = 10;
    console.log('Block 1:', x); // 10
  }

  {
    const x = 20;
    console.log('Block 2:', x); // 20
  }

  {
    const x = 30;
    console.log('Block 3:', x); // 30
  }
}

useConstInBlocks();