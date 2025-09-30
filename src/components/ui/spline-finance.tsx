"use client";

import { Suspense, lazy, useRef } from "react";

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineSceneFinance() {
  const splineRef = useRef<any>(null);

  const onLoad = (splineApp: any) => {
    if (splineApp) {
      splineRef.current = splineApp;
      
      console.log("=== Starting Spline Customization ===");
      console.log("SplineApp object:", splineApp);
      console.log("SplineApp keys:", Object.keys(splineApp));
      
      // Try multiple timeouts to catch the scene at different loading stages
      const tryCustomization = (attempt: number) => {
        console.log(`=== Attempt ${attempt} ===`);
        
        // Try different ways to access the scene
        const scene = splineApp.scene || splineApp;
        console.log(`Scene attempt ${attempt}:`, scene);
        console.log(`Scene keys attempt ${attempt}:`, Object.keys(scene));
        
        // Try to access the scene's children
        if (scene.children) {
          console.log(`Attempt ${attempt}: Scene has`, scene.children.length, "children");
          scene.children.forEach((child: any, index: number) => {
            console.log(`Child ${index}:`, child.name || 'unnamed', child.type);
            console.log(`Child ${index} properties:`, Object.keys(child));
            
            // Try to modify this child's material
            if (child.material) {
              console.log(`Child ${index} has material:`, child.material);
              try {
                child.material.color = { r: 0, g: 0.5, b: 1 };
                console.log(`Set color for child ${index}`);
              } catch (e) {
                console.log(`Failed to set color for child ${index}:`, e);
              }
            }
            
            // Check for materials array
            if (child.materials) {
              console.log(`Child ${index} has materials array:`, child.materials);
              child.materials.forEach((mat: any, matIndex: number) => {
                try {
                  mat.color = { r: 0, g: 0.5, b: 1 };
                  console.log(`Set material ${matIndex} for child ${index}`);
                } catch (e) {
                  console.log(`Failed to set material ${matIndex} for child ${index}:`, e);
                }
              });
            }
          });
        } else {
          console.log(`Attempt ${attempt}: No children found`);
        }
        
        // Try to access the scene's objects property
        if (scene.objects) {
          console.log(`Attempt ${attempt}: Scene has objects:`, scene.objects);
          Object.keys(scene.objects).forEach(key => {
            const obj = scene.objects[key];
            console.log(`Object ${key}:`, obj);
            if (obj.material) {
              try {
                obj.material.color = { r: 0, g: 0.5, b: 1 };
                console.log(`Set color for object ${key}`);
              } catch (e) {
                console.log(`Failed to set color for object ${key}:`, e);
              }
            }
          });
        } else {
          console.log(`Attempt ${attempt}: No objects found`);
        }
        
        // Try to access the scene's materials property
        if (scene.materials) {
          console.log(`Attempt ${attempt}: Scene has materials:`, scene.materials);
          Object.keys(scene.materials).forEach(key => {
            const mat = scene.materials[key];
            console.log(`Material ${key}:`, mat);
            try {
              mat.color = { r: 0, g: 0.5, b: 1 };
              console.log(`Set color for material ${key}`);
            } catch (e) {
              console.log(`Failed to set color for material ${key}:`, e);
            }
          });
        } else {
          console.log(`Attempt ${attempt}: No materials found`);
        }
        
        // Try to access the scene's root property
        if (scene.root) {
          console.log(`Attempt ${attempt}: Scene has root:`, scene.root);
          if (scene.root.children) {
            console.log(`Root has`, scene.root.children.length, "children");
            scene.root.children.forEach((child: any, index: number) => {
              console.log(`Root child ${index}:`, child.name || 'unnamed', child.type);
              if (child.material) {
                try {
                  child.material.color = { r: 0, g: 0.5, b: 1 };
                  console.log(`Set color for root child ${index}`);
                } catch (e) {
                  console.log(`Failed to set color for root child ${index}:`, e);
                }
              }
            });
          }
        } else {
          console.log(`Attempt ${attempt}: No root found`);
        }
      };
      
      // Try immediately
      tryCustomization(1);
      
      // Try after 1 second
      setTimeout(() => tryCustomization(2), 1000);
      
      // Try after 3 seconds
      setTimeout(() => tryCustomization(3), 3000);
      
      // Try after 5 seconds
      setTimeout(() => {
        tryCustomization(4);
        console.log("=== Finished Spline Customization ===");
      }, 5000);
    }
  };

  return (
    <div className="w-full h-full">
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          onLoad={onLoad}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
}
