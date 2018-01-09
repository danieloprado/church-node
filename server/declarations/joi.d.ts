import * as joi from 'joi';

/* tslint:disable */
declare module "joi" {
  export interface ValidationErrorItemString extends ValidationErrorItem {
    path: any;
  }

  export interface StringSchema {
    phone(): StringSchema;
    zipcode(): StringSchema;
  }

  export function extend(extention: Extension): JoiSchema;

  export interface JoiSchema {
    array(): ArraySchema;
    any(): Schema;

    /**
     * Generates a schema object that matches a boolean data type (as well as the strings 'true', 'false', 'yes', and 'no'). Can also be called via bool().
     */
    bool(): BooleanSchema;
    boolean(): BooleanSchema;

    /**
     * Generates a schema object that matches a Buffer data type (as well as the strings which will be converted to Buffers).
     */
    binary(): BinarySchema;

    /**
     * Generates a schema object that matches a date type (as well as a JavaScript date string or number of milliseconds).
     */
    date(): DateSchema;

    /**
     * Generates a schema object that matches a function type.
     */
    func(): FunctionSchema;

    /**
     * Generates a schema object that matches a number data type (as well as strings that can be converted to numbers).
     */
    number(): NumberSchema;

    /**
     * Generates a schema object that matches an object data type (as well as JSON strings that parsed into objects).
     */
    object(schema?: SchemaMap): ObjectSchema;

    /**
     * Generates a schema object that matches a string data type. Note that empty strings are not allowed by default and must be enabled with allow('').
     */
    string(): StringSchema;

    /**
     * Generates a type that will match one of the provided alternative schemas
     */
    alternatives(): AlternativesSchema;
    alternatives(types: Schema[]): AlternativesSchema;
    alternatives(type1: Schema, type2: Schema, ...types: Schema[]): AlternativesSchema;

    /**
     * Generates a placeholder schema for a schema that you would provide with the fn.
     * Supports the same methods of the any() type.
     * This is mostly useful for recursive schemas
     */
    lazy(cb: () => Schema): Schema;

    /**
     * Validates a value using the given schema and options.
     */
    validate<T>(value: T, schema: Schema, callback: (err: ValidationError, value: T) => void): void;
    validate<T>(value: T, schema: Object, callback: (err: ValidationError, value: T) => void): void;
    validate<T>(value: T, schema: Object, options?: ValidationOptions, callback?: (err: ValidationError, value: T) => void): ValidationResult<T>;

    /**
     * Converts literal schema definition to joi schema object (or returns the same back if already a joi schema object).
     */
    compile(schema: Object): Schema;

    /**
     * Validates a value against a schema and throws if validation fails.
     *
     * @param value - the value to validate.
     * @param schema - the schema object.
     * @param message - optional message string prefix added in front of the error message. may also be an Error object.
     */
    assert(value: any, schema: Schema, message?: string | Error): void;


    /**
     * Validates a value against a schema, returns valid object, and throws if validation fails where:
     *
     * @param value - the value to validate.
     * @param schema - the schema object.
     * @param message - optional message string prefix added in front of the error message. may also be an Error object.
     */
    attempt<T>(value: T, schema: Schema, message?: string | Error): T;


    /**
     * Generates a reference to the value of the named key.
     */
    ref(key: string, options?: ReferenceOptions): Reference;


    /**
     * Checks whether or not the provided argument is a reference. It's especially useful if you want to post-process error messages.
     */
    isRef(ref: any): boolean;


    /**
     * Get a sub-schema of an existing schema based on a path. Path separator is a dot (.).
     */
    reach(schema: Schema, path: string): Schema;

    extend(extention: Extension): JoiSchema;

  }

  export interface CustomValidationError {
    validationError: boolean;
    message: ValidationErrorItemString[];
  }
}